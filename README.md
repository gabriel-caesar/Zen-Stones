# Zen Stones Website

Website link: https://www.zenstonesridgewood.com/

Demo video: https://youtu.be/uz2ZPBAK0og

## Introduction

  - This is a catalog website built with **Next.js App Router**.
  - Built and deployed using common practices described in the details section.
  - The core idea was to deliver a scalable website featuring at first only a catalog of products and an admin space to manage products and the product landing page.
  - In the code section I try to list all the functions paths that I found important for you to take a look at and understand better what I came up with to make the logic work.
  - The **main functionalities** are in the hands of the admin, who can create, edit and delete products. Also, the admin can create and edit product types and manage what products are featured in the main page.
  - The **demo video's purpose** is to give insight on how the admin can edit its website products since this is a freelance project and I can’t share sensitive credentials.

## Details

  - **Pages**: this website has 5 main pages including the main, catalog, product, inquiry and admin space pages
  - **Database**: I chose **Neon** as the database platform, using **PostgreSQL** syntax
  - **Deployment**: Used **Vercel** for the production deployment and **GoDaddy** for the domain management.
  - **Image storage**: Implemented image storage using **AWS S3 buckets**.
  - **Authentication**: The auth was implemented by manually generating **JWT tokens** with the **jose** library.
  - **Product filtering**: Uses **URL params** so the root page files can read them and query the database for the desired product details

## Database structure
  **The tables are**: products, product_images, types and users.  
  I will also represent what each table accepts as a row through the types file in the project.

  **Products table**:
  ```ts
  export type Product = {
    id: string;
    name: string;
    category: Category;
    product_type: string;
    price: number;
    material: string[];
    properties: string[];
    indicated_for: string[];
    description: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
    weight: string;
    meaning: string;
    size: string;
    featured_material: string;
    featured_section: boolean;
    is_collection: boolean;
  }
  ```

  **Product images table**:
  ```ts
  export type ProductImage = {
    id: string;
    product_id: string; // foreign key
    url: string;
    position: number;
    created_at: string;
  }
  ```

  **Product type table**:
  ```ts
  export type productType = {
    id: string;
    product_type: string;
    parent_category: Category;
    featured_image: string;
  }
  ```

  **Users table**:
  ```ts
  export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    admin: boolean,
  }
  ```


## Code

  - **Inquiry**:  
      The first complex logic the user can get in touch with right away is the **inquiry option** which lets them email the store owner about any concern or general inquiry.

      > - Implemented with **Resend** and **React Emails**.
      > - In the `InquiryForm()` component, using server actions, the program calls the `sendInquiry()` function upon submit.
      > - **Zod** validates the input fields through `inquirySchema`.
      > - `sendInquiry()` calls the api route `/api/inquiry` with a POST method and sends over  some info from the form with it.
      > - Inside the API route, **Resend** handles the email delivery and receives a React component `InquiryEmail()` as the email content.
      <br></br>
      --- 
      **Important function references**:
      - `sendInquiry()` → `/app/lib/actions.ts`
      - `InquiryEmail` → `app/emails/inquiry.tsx`
      - `inquirySchema` → `app/lib/schemas.ts`
      ---
      <br></br>

  - **Log In**:  
      The login function is only included for the admin in this version which gets it access to the admin space and power to manage the main page, products and types.

      > - In the `LoginForm()` component, using server actions, the program calls the `login()` function upon submit.
      > - **Zod** validates the input fields through `loginSchema`.
      > - `login()` will try to fetch user from the database by checking the password and email credentials.
      > - If success in the last step, we create a session for the user with the `createSession()` function using a **JWT token** provided by **jose**.
      > - User gets redirect to the main page.
      <br></br>
      ---
      **Important function references**:
      - `login()` → `/app/lib/actions.ts`
      - `createSession` → `app/lib/session.ts`
      ---
      <br></br>

  - **Log Out**:  
      If the log out button is clicked the user is logged out.

      > - In the `Log()` component, the function `logout()` is called if the admin is logged in.
      > - Then `deleteSession()` is fired deleting the cookie session for the admin.
      <br></br>
      ---
      **Important function references**:
      - `logout()` → `/app/lib/actions.ts`
      - `deleteSession()` → `/app/lib/session.ts`
      ---
      <br></br>

  - ### Product CRUD
      Logic that rules the product management where the admin can create, read, update or delete items.

      **Reading a product**:
       
      > - Products can be read by the `SearchProduct()` component using the `SearchBarAdmin()` search bar component.
      > - In there, `handleSearch()` function will populate params to the URL with the admin query.
      > - Then, `page.tsx` reads the URL, using the params to fetch the products from the database using the `fetchSearchedProducts()` function.
      <br></br>

      **Creating a product**:

      > -  In the `AddProductForm()` component, using server actions, the program calls the `createProduct()` function upon submit.
      > -  **Zod** validates the input fields through `productSchema`.
      > -  Calls the **AWS S3** API through the `callS3API()` function to upload the product images to a **S3 bucket**.
      > -  Inserts all the product information retrieved from the form to the database.
      > -  With the returning image url from the S3 API call and the id from the inserted product, the image info is inserted in its own table in the database.
      > - Lastly, the function will update the URL so `FeedbackDialog()` component can display a feedback bubble stating the successful product creation.
      <br></br>

      **Updating a product**:

      > - First, the app reads the product (as explained in the "Reading a product" section).
      > - Once the desired product is found, `EditOrDeleteProductCard()` component will render the product card with two options: delete or edit.
      > - After choosing the edit option, the program redirects the admin to the `/app/edit-product/[id]/page.tsx` route where the id would be filled with the product id.
      > - In this page, `EditProductForm()` component handles the server action by calling the `editProduct()` function.
      > - Lastly the server action function will update all info from the product and add any additional image to the database as well.
      <br></br>

      **Deleting a product**:
      > - Following the same first steps from updating the product, the user would click the delete button.
      > - Followed by a security check, the item would be deleted by calling the `deleteProduct()` function fired by `handleDelete()` in the front-end.
      > - Finally, with `deleteFilesFromS3()` function, the images from **S3** would be deleted. As well as the product row from the products table in the database.
      <br></br>
      ---
      **Important function references**:
      - `createProduct()` → `/app/lib/actions.ts`
      - `callS3API()` → `/app/lib/actions.ts`
      - `editProduct()` → `/app/lib/actions.ts`
      - `deleteFilesFromS3()` → `/app/lib/actions.ts`
      <br></br>
      ---
      <br></br>

  - ### Type management
    A product type is essentially a **sub-category**, so when talking about the jewelry **main category**, every product needs to be under a type, for example: Rings, Necklaces, etc. or if the **main category** is Metaphysical then types should be, for example: Singing Bowls, Obelisks, etc.

    **Creating a type**:
    > - In the `ManageTypeForm()` component, upon submit the program calls the `createType()` function through server actions.
    > - In this function, the code saves a featured image for the product type in a **AWS S3 bucket** and inserts all the type info in the database.
    > - Finally the user is notified if the creation was successful through the `FeedbackDialog()` component.
    <br></br>

    **Deleting a type**:
    > - Upon submit the program calls the  `deleteType()` function through server actions.
    > - Then, the function will delete the type from the database and its featured image with the `deleteFilesFromS3()` function.
    <br></br>
    ---
    **Important function references**:
    - `createType()` → `/app/lib/actions.ts`
    - `deleteType()` → `/app/lib/actions.ts`
    - `deleteFilesFromS3()` → `/app/lib/actions.ts`
    <br></br>
    ---

  - ### Product filtering and sort
      In the catalog page is where any user can filter a product and that's done with the **URL params** and **database fetching** to save front-end compute, because if the code fetched all products at once and only then filtered with JS logic, that would become a expensive technical debt if the catalog grows.  

      There are two filter components: `FilterLargeScreen()` for wider screens and `FilterSidebar()` for narrow screens.

      Sorting is done in the frontend with the filtered products in place.

      **Filtering**:
      > - In the catalog page, there will be a tab with all filtering options: Category, Material, Price, Indications, Properties and Type.
      > - The `fetchFilteredProducts()` function is the main character to fetch any filtered product in the database. Its SQL query dynamically checks if there are any filter options within the product info, and then retrieves the results to the front-end.
      > - Catalog's `page.tsx` is ever watching for a param in the URL to find any filter options and feed the `fetchFilteredProducts()` function's parameters.
      > - If there is no filter, it fetches all products.
      > - In the filter component, the code also calculates how frequently each filter option appears among products. This is done in the `dbCall()` function, which queries the database while simultaneously updating the front-end state with fresh data.
      <br></br>
      ---
      **Important function references**:
      - `fetchFilteredProducts()` → `/app/lib/data.ts`
      - `dbCall()` → `/app/ui/catalog/FilterLargeScreen|FilterSideBar.tsx`
      - `FilterLargeScreen()` → `/app/ui/catalog/CatalogWrapper.tsx`
      - `FilterSidebar()` → `/app/ui/catalog/CatalogWrapper.tsx`
      <br></br>
      ---

  - ### Main page management
      In the main page, the admin is able to feature two special products and add items to a collection field in the bottom of the page, which sells an idea of a featured collection chosen by the business owner.  
      
      Before featuring or adding any product to the collection, the items are searched by the `FeaturedSearch()` component.

      **Featuring a product**:
      > - Once the search is done, the admin can click the "**Select as featured**" button to feature the product.
      > - This action will call the `featurizeProduct()` function in the back-end which is fired by the `handleFeaturize()` in the front-end.
      > - `featurizeProduct()` will then toggle the product property `featured_section` to **true** in the database.
      <br></br>

      **Adding a product to the collection**:
      > - After the search is done, the admin can click the "**Add to collection button**" to add the product to the main page collection.
      > - The `addProductToCollections()` function will be called in the back-end by the `handleCollection()` function in the front-end.
      > - `addProductToCollections()` will toggle the product property `is_collection` to **true** in the database.
      <br></br>

      **Reading featured and collection products**:
      > - Front-end sections that renders featured products will use the `fetchFeaturedProducts()` function to fetch from the database.
      > - Now, for the collection products, the `fetchCollectionProducts()` function will be used to fetch from the database.
      > - Those products will be rendered (using map) from an array of products stored in an `useState()` for either featured or collection products.
      <br></br>
      ---
      **Important function references**:
      - `FeaturedSearch()` → `/app/ui/manage-main-page/FeaturedSearch.tsx`
      - `featurizeProduct()` → `/app/lib/actions.ts`
      - `addProductToCollections()` → `/app/lib/actions.ts`
      - `fetchFeaturedProducts()` → `/app/lib/data.ts`
      - `fetchCollectionProducts()` → `/app/lib/data.ts`
  