// create a particular togglepower by name
const createTogglepower = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `https://api.lifx.com/v1/lights/${bundle.inputData.selector}/toggle`,
    body: JSON.stringify({
      duration: bundle.inputData.duration
    })
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'toggle_power',
  noun: 'TogglePower',

  display: {
    label: 'Toggle Light Power',
    description: 'Toggle lights on or off'
  },

  operation: {
    inputFields: [
      {
        key: 'selector',
        label: 'Select light(s) to change',
        required: true,
        type: 'string',
        default: 'all'
      },
      {
        key: 'duration',
        label: 'How long in seconds the power action should take',
        required: true,
        type: 'number',
        default: '1.0'
      }
    ],
    perform: createTogglepower,

    outputFields: [
      {
        key: 'id',
        label: 'ID'
      },
      {
        key: 'label',
        label: 'Label'
      },
      {
        key: 'status',
        label: 'Status'
      }
    ]
  }
};
