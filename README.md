# ksrv:datatables-reactive

Simple template for usage jQuery dataTables plugin

## Installation

```
$ meteor add ksrv:datatables-reactive
```

## Usage

```html
<template name="anyname">
  ...
  {{>datatable data=data options=options}}
  ...
</template>
```

```js
import { Template } from 'meteor/templating';

Template.anyname.helpers({
    data () {
        return function () {
            return Items.find().fetch();
        }
    }

    options () {
        return {
            ...
            columns: [{
                title: 'Name',
                data:  'name',
                className: 'any-css-class'
            }]
            ...
        }
    }
});
```

Your "data" helpers must return function!

See [ksrv:datatables](https://atmospherejs.com/ksrv/datatables), [ksrv:datatables-bootstrap3](https://atmospherejs.com/ksrv/datatables-bootstrap3), [ksrv:datatables-ru](https://atmospherejs.com/ksrv/datatables-ru)