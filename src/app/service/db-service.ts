import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    doc,
    docData,
    getDoc,
    setDoc,
    deleteDoc
} from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { UserData } from "../model/user-data";
import { DuplicateUserError, InvalidPhoneError } from "./db-errors";

/**
 * Users are keyed by phone number, so the normalized phone IS the document id.
 * Strips formatting so "(613) 555-0199" and "613-555-0199" resolve to one user.
 */
function phoneKey(phone: string): string {
    const key = phone.replace(/\D/g, '');
    if (!key) {
        throw new InvalidPhoneError(phone);
    }
    return key;
}

@Injectable({
    providedIn: 'root'
})
export class DbService {
    private firestore: Firestore = inject(Firestore);

    private usersRef() {
        return collection(this.firestore, 'users');
    }

    private userRef(phone: string) {
        return doc(this.usersRef(), phoneKey(phone));
    }

    getUsers(): Observable<UserData[]> {
        return collectionData(this.usersRef()) as Observable<UserData[]>;
    }

    getUser(phone: string): Observable<UserData | undefined> {
        return docData(this.userRef(phone)) as Observable<UserData | undefined>;
    }

    /** Creates or overwrites the user with this phone number. */
    saveUser(user: UserData): Promise<void> {
        return setDoc(this.userRef(user.phone), { ...user });
    }

    /** Rejects if a user with this phone number already exists. */
    async createUser(user: UserData): Promise<void> {
        const ref = this.userRef(user.phone);
        if ((await getDoc(ref)).exists()) {
            throw new DuplicateUserError(user.phone);
        }
        return setDoc(ref, { ...user });
    }

    deleteUser(phone: string): Promise<void> {
        return deleteDoc(this.userRef(phone));
    }
}
