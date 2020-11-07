# gizmo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run watch
```

### Register
```
POST /api/v1/user/register
{
    email: "",
    password: "",
    phone: "",
    name: ""
  }

```

### Login
```
POST /api/v1/auth/login
{
    email: "",
    password: "",
  }

```

### Add property
```
POST /api/v1/property/add-property
{
    email: "",
    password: "",
  }

```
### Get sellers properties
```
GET /api/v1/property/fetch-properties
{
    id: "5f872b41a775161af45cd772"
  }

```
#### Response 
```
data: [
  {
    images: [
      'http://res.cloudinary.com/upload__preset/image/upload/v1602530011/isnabzpnzo4gm8w1nxjx.png',
      'http://res.cloudinary.com/upload__preset/image/upload/v1602530014/asjd0bsyfn4fksn6dhy1.png'
    ],
    _id: 5f84aade6c25341a4018426d,
    type: 'duplez',
    size: '70 acres',
    noOfRooms: 90,
    price: 90000,
    state: 'engu, nsukka',
    landmark: 'comfort oboh',
    location: 'Comfort Oboh St, Kirikiri, Lagos, Nigeria',
    ownerId: '5f6354dc2da6372cb4bc153f',
    __v: 0
  },
]
```
