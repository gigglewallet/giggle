# Giggle API Documentation

## Table of Contents

1. [General](#general)
    1. [General_Info](#general-info)
    1. [Launch_Info](#launch-info)
1. [Avatars](#avatars)
    1. [Create New Avatar](#create-new-avatar)
    1. [Delete Avatar](#delete-avatar)
    1. [List Avatars](#list-avatars)
1. [Settings](#settings)
    1. [Get Settings](#get-settings)
    1. [Update Settings](#update-settings)
1. [Contact](#contact)
    1. [Get Contacts](#get-contacts)
    1. [Add Contact](#add-contact)
    1. [Delete Contact](#delete-contact)
    1. [Contact Detail](#contact-detail)
    1. [Edit_Contact note](#edit-contact-note)
1. [Transaction](#transaction)
    1. [List_All_Transactions](#list-all-transactions)
    1. [Transaction Detail](#transaction-detail)
1. [Wallet](#wallet)
    1. [Get_Balance](#get-balance)
    1. [Send](#send)
    1. [Ask](#ask)

## General

### General Info

相關資訊說明頁面

* **URL**

  * /general_info

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | info                  | JSON     | JSON Encoded                                                                |
    | - app_name                | string  | TRUE/FALSE                                                               |
    | - designer                | string   |                                                                         |
    | - app_icon                | string   | url                                                                     |
    | - purpose_of_design       | string   |                                                                         |
    | - still_missing           | string   |                                                                         |
    | - for_what_is_not_missing | string   |                                                                         |
   

* **Sample Call:**

  ```
  /general_info?sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
  
### Launch Info

Launch 頁面資訊

* **URL**

  * /launch_info

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | info                  | JSON     | JSON Encoded                                                                |
    | - desc                | string  |                                                                          |
   

* **Sample Call:**

  ```
  /launch_info?sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
   
    
## Avatars

### Create New Avatar

產生新的avatar code，可選擇random 或customize

* **URL**

  * /create_avatar

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `method=[string]`
  or
  `avatar_code=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | avatar                | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - related_grinbox_address             | string   | grinbox address                                             |
   

* **Sample Call:**

  ```
  /create_avatar?method=customize&avatar_code=abc336&sn=af852d6376d3121133ec23df2c1da8e7
  /create_avatar?method=random&sn=af852d6376d3121133ec23df2c1da8e7
  ```
  
### Delete Avatar

刪除avatar code，unique id 與avatar code 需同時滿足（要刪除，需要產生的那個unique id 才能刪除）

* **URL**

  * /delete_avatar

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   

* **Sample Call:**

  ```
  /delete_avatar?unique_id=ryantest1208&avatar_code=ABC334&sn=af852d6376d3121133ec23df2c1da8e7
  ```

### List Avatars

依據unique id 列出相對應的avatars

* **URL**

  * /list_avatars

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | avatars               | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - related_grinbox_address             | string   | grinbox address                                             |

* **Sample Call:**

  ```
  /list_avatars?unique_id=ryantest1208&sn=af852d6376d3121133ec23df2c1da8e7
  ```

## Settings

### Get Settings

依據unique id, 撈回相對應的settings

* **URL**

  * /get_settings

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | settings              | object   | JSON Encoded                                                                |
    | - unique_id           | string   | unique device id                                                            |
    | - transaction_fee     | string   | double numbers. ex: 0.0001                                                  |
    | - node_ip             | string   | node ip. ex: 123.456.789.111                                                |
    | - node_port           | string   | node port. ex: 12345                                                        |
   
 
* **Sample Call:**

  ```
  /get_settings?unique_id=ryantest1208&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
  
### Update Settings

依據unique id, 給予新的setting 資料

* **URL**

  * /update_settings

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `node_ip=[string]`
  and
  `node_port=[string]`
  and
  `transaction_fee=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   
 
* **Sample Call:**

  ```
  /update_settings?unique_id=ryantest1208&node_ip=111.111.11.1&node_port=12345&transaction_fee=0.0001&sn=6503f61751a35f2d54d2122d590a23e6
  ```
  
## Contact

### Get Contacts

依據unique id, 撈回相對應的contacts

* **URL**

  * /get_contacts

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | contacts              | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - note                | note     |                                                                             |
   
 
* **Sample Call:**

  ```
  /get_contacts?unique_id=ryantest1208&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
  
### Add Contact

依據unique id, 新增contact

* **URL**

  * /add_contact

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`
  and
  `note=[string]`


* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   
 
* **Sample Call:**

  ```
  /add_contact?unique_id=ryantest1208&avatar_code=AAA12B&note=testest&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

### Delete Contact

依據unique id, 刪除contact

* **URL**

  * /add_contact

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   
 
* **Sample Call:**

  ```
  /delete_contact?unique_id=ryantest1208&avatar_code=AAA12B&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
  
### Contact Detail

依據unique id, 刪除contact

* **URL**

  * /contact_detail

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | contact               | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - note                | note     |                                                                             |

 
* **Sample Call:**

  ```
  /contact_detail?unique_id=ryantest1208&avatar_code=AAA12B&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

### Edit Contact Note

依據avatar code, 修改note 

* **URL**

  * /edit_contact_note

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`
  and
  `note=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |

* **Sample Call:**

  ```
  /edit_contact_note?unique_id=ryantest1208&avatar_code=AAA12B&note=testtestmodified&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

## Transaction

### List All Transactions

依據unique id, 撈回相對應的transaction history

* **URL**

  * /list_all_transactions

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | transactions          | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - amount              | string   |                                                                             |
    | - note                | string   |                                                                             |
    | - transaction_id      | string   |                                                                             |
    | - transaction_time    | time     |                                                                             |
    | - transaction_status  | string   | processing/confirmed                                                        |
   
 
* **Sample Call:**

  ```
  /list_all_transactions?unique_id=ryantest1208&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

### Transaction Detail

依據transaction id, 撈回相對應的transaction detail

* **URL**

  * /transaction_detail

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `transaction_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | transaction           | object   | JSON Encoded                                                                |
    | - avatar_code         | string   | 6-digit code, always uppercase                                              |
    | - amount              | string   |                                                                             |
    | - note                | string   |                                                                             |
    | - transaction_id      | string   |                                                                             |
    | - transaction_time    | time     |                                                                             |
    | - transaction_status  | string   | processing/confirmed                                                        |   
 
* **Sample Call:**

  ```
  /transaction_detail?unique_id=ryantest1208&transaction_id=017778&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

## Wallet

### Get Balance

依據unique id, 撈回目前錢包裡的balance

* **URL**

  * /get_balance

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
    | balance               | double   |                                                                             |
   
* **Sample Call:**

  ```
  /get_balance?unique_id=ryantest1208&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

### Send

匯款至指定的avatar code

* **URL**

  * /send

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`
  and
  `amount=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   
* **Sample Call:**

  ```
  /send?unique_id=ryantest1208&avatar_code=TTRE12&amount=0.2&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```

### Ask

向指定的avatar code 要求匯款

* **URL**

  * /ask

* **Method:**

  `GET`
  
* **URL Params**

  **Required:**
  `sn=[string]`
  and
  `unique_id=[string]`
  and
  `avatar_code=[string]`
  and
  `amount=[string]`

* **Success Response:**

  * **Code:** 200
  * **Content:**

    | Field                 | Type     | Description                                                                 |
    |:----------------------|:---------|:----------------------------------------------------------------------------|
    | status                | boolean  | TRUE/FALSE                                                                  |
    | msg                   | string   | error message                                                               |
   
* **Sample Call:**

  ```
  /ask?unique_id=ryantest1208&avatar_code=TTRE12&amount=2.2&sn=6503f61751a35f2d54d2122d590a23e6
  
  ```
