/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 22.12.2025
 * @last modified by  : batuayyildiz
**/
public with sharing class AccountBrowser {

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name
                FROM Account];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getRelatedContacts(String accountId){
        return [SELECT Id, FirstName, LastName
                FROM Contact
                WHERE AccountId = :accountId];
    }
}