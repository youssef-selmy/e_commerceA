# e_commerceA

### e-commerce API --> API for products, API for categories, API for users, API for cart, API for auth


## Technologies
### node js express MongoDB


## Features
### Create a product, category, user as admin or seller or just user, search for product or category or user, sorting, filtering, pagination, limiting, using jwt for authenticate



## Setup
### After downloading the project and opening it by vs code or any idl
### you need to run 
```npm install``` or ```npm i```
### to install all packages used in this project

### After this you need to prepare your .env file by adding DB_URL, Environment, Port, jwt_secret_key, jwt_expirs_date

### After all of this you need to run your program
```npm run dev```


#### After this you test your API by using Postman

##### API for testing

		[ User Operations ]

        - api to signup                                     api/v1/auth/signup   
	- api to login                                      api/v1/auth/login
	- api to add new user                               api/v1/users       take from body(name ,password,passwordConfirm,email)
	- api to get user_data                              api/v1/users/:id
	- api to edit user_data                             api/v1/users/:id    take your edit from body
        * api to upload prfile img                          api/v1/users/uploadImage/:id
--------------------------------------------
		[ Admin ]

	- api to search for users                           api/v1/users/:id
        - api to report user                                api/v1/users/updateuserReport/:id
	- api to get reports for admin dashboard            api/v1/users/getUSerReports/repo
	- api to approve seller account                     api/v1/users/aproveSeller/:id
	- api to see banned users                           api/v1/users/all/banUSers
	- api to ban user                                   api/v1/users/ban/:id
	- api to unban user                                 api/v1/users/unban/:id

--------------------------------------------
		[ Category ]
                                                                                   -method
	- api to add new category                           api/v1/categories      //post
	- api to get categorys                              api/v1/categories      //get
        * api to upload category img                        api/v1/categories/uploadImage/:id
--------------------------------------------
		[ Products ]
                           1      2      3
	- api for product [Get, Post, Delete]                     1                        2                             3
                                                            api/v1/products/:id      api/v1/products            api/v1/products/:id
	- api for search //  [pagination=20]                api/v1/products
	- api for products ( filter || sort )
	- api to report product                             api/v1/products/updateProductReports/:id
        * api to upload product img                         api/v1/products/uploadImage/:id
-------------------------------------------
      [cart]
        -api for get cart item                              api/v1/cart          //get
        -api for add product to cart                        api/v1/cart          //post
        -api to clear cart                                  api/v1/cart          //delete
        -api to update cart item                            api/v1/cart/:id      //put
        -api to delete spcfi item                           api/v1/cart/:id      //delete

-------------------------------------------


