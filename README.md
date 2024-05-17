# Menu-Management-Backend-Guestara
Backend For Menu Management for Assignment


## Categories

### Post a Category

- **Endpoint**: `/category`
- **Description**: Create a new category with provided details.
- **Request Body**
```json Object
{
    "categoryName": "Indian",
    "image": "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3Jhd3BpeGVsb2ZmaWNlMTVfaW5kaWFuX2Zvb2Rfb25fd2hpdGVfYmFja2dyb3VuZC1fZTNiYmIxYWItYTlkOS00OTRhLWFmZGYtYjBmZjYyZDcxNTUzLnBuZw.png",
    "description": "Indian Food Originates from Asian Nation India, known for its diverse culture",
    "taxApplicability": true,
    "tax": 18,
    "taxType": "GST"
}
```
- **Response**: Returns the created category object.

### Get All Categories

- **Endpoint**: `/category`
- **Description**: Retrieve all categories available in the system.
- **Response**: Returns an array of category objects.

### Get Category by Name

- **Endpoint**: `/category/:categoryName`
- **Description**: Retrieve a category by its unique name.
- **Response**: Returns the category object with the specified name.

### Update Category

- **Endpoint**: `/category/:categoryName`
- **Description**: Update attributes of a specific category.
- **Request Body**: JSON object with attributes to update.
  ``` Json Object
  {
    
    "description": "Indian Food Originates from Asian Nation India",
    "tax": 9,
  }
  ```

- **Response**: Returns the updated category object.

### Delete Category

- **Endpoint**: `/category/:categoryName`
- **Description**: Delete a category by its unique name.
- **Response**: Returns a message indicating successful deletion.

## Subcategories

### Post a Subcategory

- **Endpoint**: `/subcategories`
- **Description**: Create a new subcategory under a specified category.
- **Request Body**: JSON object with attributes: subcategoryName, categoryName.
- **Response**: Returns the created subcategory object.

### Get All Subcategories

- **Endpoint**: `/subcategories`
- **Description**: Retrieve all subcategories available in the system.
- **Response**: Returns an array of subcategory objects.

### Get Subcategories by Category

- **Endpoint**: `/subcategories/:categoryName`
- **Description**: Retrieve all subcategories under a specific category.
- **Response**: Returns an array of subcategory objects.

### Get Subcategory by Name

- **Endpoint**: `/subcategory/:subcategoryName`
- **Description**: Retrieve a subcategory by its unique name.
- **Response**: Returns the subcategory object with the specified name.

### Update Subcategory

- **Endpoint**: `/subcategories/:subcategoryName`
- **Description**: Update attributes of a specific subcategory.
- **Request Body**: JSON object with attributes to update.
- **Response**: Returns the updated subcategory object.

### Delete Subcategory

- **Endpoint**: `/subcategories/:subcategoryName`
- **Description**: Delete a subcategory by its unique name.
- **Response**: Returns a message indicating successful deletion.

## Items

### Post an Item

- **Endpoint**: `/items`
- **Description**: Create a new item under a specified subcategory.
- **Request Body**: JSON object with attributes: itemName, image, categoryName, subcategoryName, description, taxApplicability, tax, baseAmount, discount.
- **Response**: Returns the created item object.

### Get All Items

- **Endpoint**: `/items`
- **Description**: Retrieve all items available in the system.
- **Response**: Returns an array of item objects.

### Get Items by Category

- **Endpoint**: `/items/category/:categoryName`
- **Description**: Retrieve all items under a specific category.
- **Response**: Returns an array of item objects.

### Get Items by Subcategory

- **Endpoint**: `/items/subcategory/:subcategoryName`
- **Description**: Retrieve all items under a specific subcategory.
- **Response**: Returns an array of item objects.

### Search Items

- **Endpoint**: `/items/search?name={partialName}`
- **Description**: Search items by partial name match.
- **Response**: Returns an array of item objects matching the partial name.

### Get Item by Name

- **Endpoint**: `/items/:itemName`
- **Description**: Retrieve an item by its unique name.
- **Response**: Returns the item object with the specified name.

### Update Item

- **Endpoint**: `/items/:itemName`
- **Description**: Update attributes of a specific item.
- **Request Body**: JSON object with attributes to update.
- **Response**: Returns the updated item object.

### Delete Item

- **Endpoint**: `/items/:itemName`
- **Description**: Delete an item by its unique name.
- **Response**: Returns a message indicating successful deletion.

