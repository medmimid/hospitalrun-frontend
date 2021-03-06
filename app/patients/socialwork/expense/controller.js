import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import IsUpdateDisabled from 'hospitalrun/mixins/is-update-disabled';
import SelectValues from 'hospitalrun/utils/select-values';
import { translationMacro as t } from 'ember-i18n';

export default Controller.extend(IsUpdateDisabled, {
  patientsController: controller('patients'),

  categoryTypes: [
    'Clothing',
    'Education',
    'Electricity',
    'Food',
    'Fuel',
    'Other',
    'Rent',
    'Transportation',
    'Water'
  ].map(SelectValues.selectValuesMap),

  editController: alias('patientsController'),
  showUpdateButton: true,
  title: t('patients.titles.socialWork'),
  updateButtonAction: 'update',

  updateButtonText: function() {
    let isNew = this.get('model.isNew');
    if (isNew) {
      return this.get('i18n').t('buttons.add');
    } else {
      return this.get('i18n').t('buttons.update');
    }
  }.property('model.isNew'),

  actions: {
    cancel() {
      this.send('closeModal');
    },

    update() {
      let model = this.get('model');
      this.get('editController').send('updateExpense', model);
    }
  }
});
