## userInfo

```js
var userInfo = {
  id: String,//userId
  name: String,
  token: String,
};
```

defined in Login.vue

## cardControlObj

```js
var cardControlObj = {
    cardName: String,
    animation: String,
    ownerId:String
    pop: Boolean,  
    show: Boolean
    faceUp:Boolean
    choosable:Boolean
}
```

card default is a card

* face down
* non-pop
* non-choosable
* show up

card acquired by fun getCard is

* has name
* has owner
* face Up
* show up
* non-pop
* non-choosable