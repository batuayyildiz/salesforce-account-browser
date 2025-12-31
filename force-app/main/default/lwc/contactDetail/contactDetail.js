/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 31.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_DESCRIPTION from '@salesforce/schema/Contact.Description';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SELECTED_CONTACT_CHANNEL from '@salesforce/messageChannel/SelectedContactChannel__c';
import { NavigationMixin } from 'lightning/navigation';
import Utils from 'c/utils';

const fields = [FIELD_NAME, FIELD_DESCRIPTION, FIELD_PHONE, FIELD_EMAIL];

export default class ContactDetail extends NavigationMixin(LightningElement) {

    contactId;
    subscription;

    @wire(getRecord, { recordId : '$contactId', fields })
    wiredContact;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        if(this.subscription) return;

        this.subscription = subscribe(
            this.messageContext,
            SELECTED_CONTACT_CHANNEL,
            (message) => {
                this.handleContactChange(message);
            }
        );
    }

    get name(){
        return Utils.getDisplayValue(this.wiredContact.data, FIELD_NAME);
    }

    get description(){
            return Utils.getDisplayValue(this.wiredContact.data, FIELD_DESCRIPTION);
    }

    get phone(){
            return Utils.getDisplayValue(this.wiredContact.data, FIELD_PHONE);
    }

    get email(){
            return Utils.getDisplayValue(this.wiredContact.data, FIELD_EMAIL);
    }

    get cardTitle(){
        let title = 'Please select a contact';

        if(this.wiredContact.data){
            title = this.name;
        }
        else if(this.wiredContact.error){
            title = 'Something went wrong...';
        }

        return title;
    }

   handleContactChange(message){
       this.contactId = message.contactId;
   }

   handleGoToRecord(){
       this[NavigationMixin.Navigate]({
           type : 'standard__recordPage',
           attributes : {
               recordId : this.contactId,
               actionName : 'view'
           }
       });
   }

   disconnectedCallback(){
       unsubscribe(this.subscription);
       this.subscription = null;
   }



}