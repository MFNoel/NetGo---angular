import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Tariff } from '../models/Tariff';
import { User } from '../models/User';
import { firstValueFrom, BehaviorSubject, of, from } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TariffService {
  private readonly TARIFFS_COLLECTION = 'Tariffs';
  private readonly USERS_COLLECTION = 'Users';

  private cartItemsSubject = new BehaviorSubject<Tariff[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private authService: AuthService, private firestore: Firestore) {}

  addToCart(item: Tariff) {
    this.cartItemsSubject.next([item]);
  }

  removeFromCart() {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    const items = this.cartItemsSubject.value;
    return items.length ? items[0].price : 0;
  }

  async placeOrder(): Promise<void> {
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) throw new Error('Nincs bejelentkezett felhasználó');

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) throw new Error('A felhasználó nem található');

    const newTariff = this.cartItemsSubject.value[0];
    if (!newTariff) throw new Error('A kosár üres');

    await updateDoc(userDocRef, {
      tariff: newTariff
    });

    this.removeFromCart();
  }

  async addTariff(tariff: Omit<Tariff, 'id'>): Promise<Tariff> {
    const tariffsCollection = collection(this.firestore, this.TARIFFS_COLLECTION);
    const docRef = await addDoc(tariffsCollection, tariff);
    const id = docRef.id;
    await updateDoc(docRef, { id });

    return { ...tariff, id };
  }

  async getAllTariffs(): Promise<Tariff[]> {
    const tariffsCollection = collection(this.firestore, this.TARIFFS_COLLECTION);
    const snapshot = await getDocs(tariffsCollection);
    const tariffs: Tariff[] = [];

    snapshot.forEach(doc => {
      tariffs.push({ ...(doc.data() as Tariff), id: doc.id });
    });

    return tariffs;
  }

  async updateTariff(id: string, data: Partial<Tariff>): Promise<void> {
    const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
    if (!user) throw new Error('No authenticated user found');

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) throw new Error('User not found');

    const tariffDocRef = doc(this.firestore, this.TARIFFS_COLLECTION, id);
    await updateDoc(tariffDocRef, data);
  }

  async deleteTariff(id: string): Promise<void> {
    const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
    if (!user) throw new Error('No authenticated user found');

    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) throw new Error('User not found');

    const tariffDocRef = doc(this.firestore, this.TARIFFS_COLLECTION, id);
    await deleteDoc(tariffDocRef);
  }
}