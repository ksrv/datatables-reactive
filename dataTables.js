
import { Meteor }   from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ }        from 'meteor/underscore';

class ReactiveDatatable {
    constructor (options) {
        this.options = _.defaults(options, {
            stateSave:      true,
            stateDuration:  -1,
            pageLength:     5,
            lengthMenu:     [ 3, 5, 10, 50, 100 ],
            columnDefs:     [{
                targets:        '_all',
                defaultContent: '–––'
            }],
            stateLoadParams: this.stateLoadParams 
        });
    }

    stateLoadParams (settings, data) {
        this.page = data.start / data.length;
    }

    update (data) {
        if (!data) return;
        this.datatable
            .clear()
            .rows.add(data)
            .draw(false)
            .page(this.page || 0)
            .draw(false);
    }
}

Template.datatable.rendered = function() {
    if (typeof this.data.data !== "function") {
        throw new Meteor.Error('DataTable data must be a function that returns an array via Cursor.fetch(), Cursor.map() or another (hopefully reactive) means');
    }

    if (!this.data.options && Meteor.isDevelopment && typeof console === 'object') {
        console.warn('DataTable options must be defined');
    }

    const reactiveDataTable = new ReactiveDatatable(this.data.options);

    const datatable = this.$('table').DataTable(this.data.options);

    reactiveDataTable.datatable = datatable;

    datatable.on('page.dt', function(e, settings) {
        var info = datatable.page.info();
        reactiveDataTable.page = info.page;
    });

    this.autorun(function() {
        reactiveDataTable.update(Template.currentData().data());
    });
};