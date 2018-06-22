import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginService, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, AfterViewChecked {
    hostName: string;
    account: Account;
    modalRef: NgbModalRef;
    jwt: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private loginService: LoginService,
        private eventManager: JhiEventManager
    ) {
        this.jwt = '';
        this.hostName = window.location.hostname;
    }

    ngAfterViewChecked() {
        console.log('on after view checked');
        this.updateJwt();
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.updateJwt();
            });
        });
    }

    private updateJwt() {
        if (this.isAuthenticated() === true) {
            const path = '/#/token?accesstoken=';
            const hostPort = 'http://' + this.hostName + ':8080';
            this.jwt = hostPort + path + this.loginService.getToken();
        } else {
            console.log('on else');
        }
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
