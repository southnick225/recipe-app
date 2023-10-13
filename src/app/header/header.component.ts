import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataStoreService: DataStorageService, private authService: AuthService){}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe((user) => {
            this.isAuthenticated = !user ? false: true;
            //this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }

    onSaveData(){
        this.dataStoreService.storeRecipes();
    }

    onFetchData(){
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logut();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}