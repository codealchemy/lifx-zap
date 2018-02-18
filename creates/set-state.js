const createSetState = (z, bundle) => {
  const responsePromise = z.request({
    method: 'PUT',
    url: `https://api.lifx.com/v1/lights/${bundle.inputData.selector}/state`,
    body: JSON.stringify({
      power: bundle.inputData.power,
      color: bundle.inputData.color,
      brightness: bundle.inputData.brightness,
      duration: bundle.inputData.duration
    })
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'set_state',
  noun: 'SetState',

  display: {
    label: 'SetState',
    description: 'Change the state of your lights.'
  },

  operation: {
    inputFields: [
      {
        key: 'selector',
        label: 'Select for light(s) to change',
        required: true,
        type: 'string',
        default: 'all'
      },
      {
        key: 'power',
        label: 'Toggle power on or off',
        required: true,
        type: 'string',
        choices: [ 'on', 'off' ]
      },
      {
        key: 'color',
        label: 'Change light to color (if supported)',
        required: true,
        type: 'string'
      },
      {
        key: 'brightness',
        label: 'Brightness for light (0.0 - 1.0)',
        required: true,
        type: 'number',
        default: '1.0'
      },
      {
        key: 'duration',
        label: 'How long in seconds the power action should take',
        required: true,
        type: 'number',
        default: '1.0'
      }
    ],
    perform: createSetState,

    outputFields: [
      {
        key: 'id',
        label: 'ID'
      },
      {
        key: 'label',
        label: 'Label'
      }
    ]
  }
};
