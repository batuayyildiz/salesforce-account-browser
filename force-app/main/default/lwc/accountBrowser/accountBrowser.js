/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 22.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountBrowser.getRelatedContacts';

export default class AccountBrowser extends LightningElement {

    contacts;
    error;
    accountId;

    @wire(getRelatedContacts, { accountId : '$accountId' })
    wired_getRelatedContacts({ error, data }){
        this.contacts = [];
        if(data){
            console.log('Contacts data related to this account ' + this.accountId + ' ::: ' + data);
             this.contacts = data;
        }
        else if(error){
            console.log('Error ::: ' + error);
            this.error = error;
        }
    }


    handleFilterChange(event){
        this.accountId = event.detail.accountId;
    }

}