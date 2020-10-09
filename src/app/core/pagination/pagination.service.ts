import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class PaginationService {
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  orderBy;
  idField;
  query;
  loading = false;

  pageIndexCollection = [];
  itemIndexCollection = [];
  firestoreCollection: string;

  dataQueryHooks = [];

  private docQuery$ = new Subject();
  private nextPageQuery$ = new Subject();
  emergency$ = new BehaviorSubject('');

  destroyed$ = new Subject();

  data = (newState) =>
    this.firestore.collection(this.firestoreCollection as any,
        query => {
          this.query = query;
          this.execQueryHooks();
          this.query = this.query.orderBy(this.orderBy);
          this.query = this.query.limit(this.pageSize);
          this.onDataFetchStart(newState);
          return this.query;
        })
        .valueChanges({idField: this.idField}).pipe(
        tap(this.onDataFetchEnd)
      )


  constructor(private firestore: AngularFirestore) {
    this.docQuery$.pipe(
      takeUntil(this.destroyed$),
      switchMap(({id, pageIndex}) => this.firestore.doc(this.firestoreCollection + '/' + id)
        .get().pipe(
          tap(doc => this.pageIndexCollection[pageIndex] = doc)
        )
      ),
    ).subscribe();

    this.nextPageQuery$.pipe(
      takeUntil(this.destroyed$),
      switchMap(id => this.firestore.doc(this.firestoreCollection + '/' + id).get()),
      switchMap((doc) => this.firestore.collection(this.firestoreCollection,
        query => {
          this.query = query;
          this.execQueryHooks();
          return this.query.orderBy(this.orderBy).startAfter(doc).limit(this.pageSize);
        }).get()),
      tap(data => this.onDataFetchEnd(data.docs.map(doc => ({id: doc.id, ...doc.data()})), true))
    ).subscribe();

  }

  execQueryHooks = () => {
    for (const hook of this.dataQueryHooks) {
      this.query = (hook as any)(this.query);
    }
  }

  onDataFetchStart = (newPageIndex: number) => {
    if (this.total) {
      this.query = this.query.startAt(this.pageIndexCollection[newPageIndex]);
      this.pageIndex = newPageIndex;
    }
    this.loading = true;
  }

  onDataFetchEnd = (data, isNextPage = false) => {
    const pageIndex = isNextPage ? this.pageIndex + 1 : this.pageIndex;
    const isFirstTime = !this.total;

    if (!isFirstTime) {
      if (!isNextPage) {
        const dataSnapshot = JSON.stringify(data.map(item => item.id));
        const cacheSnapshot = JSON.stringify(this.itemIndexCollection[pageIndex]);
        if (data.length !== this.itemIndexCollection[pageIndex].length || dataSnapshot !== cacheSnapshot) {
          this.emergency();
          return;
        }
      }
    } else {
      this.total += data.length;
      this.itemIndexCollection[pageIndex] = data.map(item => item[this.idField]);
    }

    const isLastPage = this.pageIndex === Math.abs(this.total / this.pageSize) - 1;
    const isFirstTimeOrLastPage = (isFirstTime || isLastPage);

    if (!isFirstTime && isLastPage && isNextPage) {
      this.total += data.length;
      this.itemIndexCollection[pageIndex] = data.map(item => item[this.idField]);
    }

    this.query = null;
    this.loading = false;

    if (data.length === this.pageSize && !isNextPage && isFirstTimeOrLastPage) {
      this.nextPageQuery$.next(data[data.length - 1].id);
    }
    if (data.length && !this.pageIndexCollection[pageIndex]) {
      this.docQuery$.next({id: data[0].id, pageIndex});
    }
  }

  clear() {
    this.total = this.pageIndex = 0;
    this.pageIndexCollection = [];
    this.itemIndexCollection = [];
  }

  emergency() {
    this.clear();
    this.emergency$.next('');
  }

}
