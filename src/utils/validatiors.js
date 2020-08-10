export const isEmpty = value => {
    if (value === '') {
        return `This field can't be empty!`;
    }
};

export const isUrl = value => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (!value.match(regex)) {
        return `Please enter valid url!`;
    }
};

export const isSelected = value => {
    if(value === 'select-category') {
        return 'Please select category!'
    }
};
