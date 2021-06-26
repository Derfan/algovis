function inputRangeTemplate({
  min, max, step, value,
}) {
  return `
      <p class="input-group">
          <label for="arrayLength" class="input-label">
              Amount of Elements:
              <span id="currentLength">10</span>
          </label>
          <input id="arrayLength" name="arrayLength" class="input-field" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
      </p>`;
}

function radioButtonTemplate({
  value, label, disabled, selected,
}) {
  return `
        <li class="options-list-item${disabled ? ' disabled' : ''}">
             <input type="radio" id="${value}" name="sortingType" value="${value}" ${disabled ? 'disabled' : ''} ${selected ? 'checked' : ''}>
             <label for="${value}">${label}</label>
        </li>
    `;
}

export default { inputRangeTemplate, radioButtonTemplate };
