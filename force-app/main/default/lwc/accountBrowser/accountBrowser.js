/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 22.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountBrowser.getRelatedContacts';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_CONTACT_CHANNEL from '@salesforce/messageChannel/SelectedContactChannel__c';

export default class AccountBrowser extends LightningElement {

    contacts = [];
    error;
    accountId;
    selectedContactId = '';

    @wire(getRelatedContacts, { accountId : '$accountId' })
    wired_getRelatedContacts({ error, data }){
       this.contacts = [];
       if(data){
           this.contacts = data;
          this.dispatchEvent(new CustomEvent('doneloading', {bubbles : true, composed : true}));
       }
       else if(error){
           this.error = error;
           console.log('Error while getting related contacts data ::: ' + error);
           this.dispatchEvent(new CustomEvent('doneloading', {bubbles : true, composed : true}));
       }
    }

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        console.log('accountBrowser connectedCallback()');
    }


    handleFilterChange(event){
        this.accountId = event.detail.accountId;

        this.dispatchEvent(new CustomEvent('loading', {bubbles : true, composed : true}));
    }

    handleContactSelected(event){
        const contactId = event.detail.contactId;
        this.updateSelectedContact(contactId);
    }

    updateSelectedContact(contactId){
        this.selectedContactId = contactId;

        const gallery = this.template.querySelector('c-contact-tiles');

        if(gallery){
            gallery.setSelectedContact(contactId);
        }

        publish(this.messageContext, SELECTED_CONTACT_CHANNEL, {
            contactId : contactId
        });
    }

}