/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 22.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/AccountBrowser.getAccounts';

export default class AccountBrowserForm extends LightningElement {

    accounts;
    error;
    selectedAccountId;

    @wire(getContacts)
    wired_getContacts({ data, error }){
        this.accounts = [];
        if(data){
            console.log('Accounts data from Apex ::: ' + data);

            this.accounts.push({
                value : '',
                label : 'Select an account'
            });

            data.forEach(account => {
                this.accounts.push({
                    value : account.Id,
                    label : account.Name
                });
            });
        }
        else if(error){
            console.log('Error ::: ' + error);
            this.error = error;
        }
    }

    selectAccountChange(event){
        this.selectedAccountId = event.target.value;
        console.log('Selected account id ::: ' + this.selectedAccountId);
        this.notifyParent();
    }

    notifyParent(){
        const event = new CustomEvent('filterchange', {
            detail : {
                accountId : this.selectedAccountId
            }
        });

        this.dispatchEvent(event);
    }
}