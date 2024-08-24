function createButton(button = {}) {
  const buttonClasses = button.active ? 'active' : '';
  const metaData = `
    data-type='button'
    data-value='${JSON.stringify({ [button.name]: button.value })}'
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
  },
  {
    icon: 'format_italic',
    name: 'fontStyle',
    values: ['italic', 'normal'],
  },
  {
    icon: 'format_underlined',
    name: 'textDecoration',
    values: ['underline', 'none'],
  },
  {
    icon: 'format_align_left',
    name: 'textAlign',
    values: ['left', 'left'],
  },
  {
    icon: 'format_align_center',
    name: 'textAlign',
    values: ['center', 'left'],
  },
  {
    icon: 'format_align_right',
    name: 'textAlign',
    values: ['right', 'left'],
  },
];

/* eslint-disable import/prefer-default-export */
export function createToolbar(state) {
  return buttons.reduce((acc, btn) => {
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
}