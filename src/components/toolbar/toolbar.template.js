function createButton(button = {}) {
  const buttonClasses = button.active ? 'active' : '';
  const metaData = `
    data-type='${button.type}'
    data-value='${button.type === 'button'
    ? JSON.stringify({ [button.name]: button.value })
    : button.type}'
  `;

  return /* html */ `
    <button 
      class="btn ${buttonClasses}" 
      type="button"
      ${metaData}
    >
      <i 
        class="material-symbols-outlined"
        style="pointer-events: none"
      >
        ${button.icon}
      </i>
    </button>
  `;
}

const buttons = [
  {
    icon: 'format_bold',
    name: 'fontWeight',
    values: ['bold', 'normal'],
    type: 'button',
  },
  {
    icon: 'format_italic',
    name: 'fontStyle',
    values: ['italic', 'normal'],
    type: 'button',
  },
  {
    icon: 'format_underlined',
    name: 'textDecoration',
    values: ['underline', 'none'],
    type: 'button',
  },
  {
    icon: 'format_align_left',
    name: 'textAlign',
    values: ['left', 'left'],
    type: 'button',
  },
  {
    icon: 'format_align_center',
    name: 'textAlign',
    values: ['center', 'left'],
    type: 'button',
  },
  {
    icon: 'format_align_right',
    name: 'textAlign',
    values: ['right', 'left'],
    type: 'button',
  },
];

/* eslint-disable import/prefer-default-export */
export function createToolbar(state) {
  let toolbarTemlate = buttons.reduce((acc, btn) => {
    const [isNotActive, isActive] = btn.values;
    const preparedButton = {
      ...btn,
      active: false,
      value: isNotActive,
    };

    if (state[btn.name] === isNotActive) {
      preparedButton.active = true;
      preparedButton.value = isActive;
    }

    const buttonTemplate = createButton(preparedButton);

    return `${acc}${buttonTemplate}`;
  }, '');

  const resetButton = createButton({
    type: 'reset',
    icon: 'reset_settings',
  });

  toolbarTemlate = `${toolbarTemlate}${resetButton}`;

  return toolbarTemlate;
}
