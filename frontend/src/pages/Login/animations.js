module.exports = {

    conectErrorAnimation(enterButton) {
        enterButton.current.id = 'Active';
        setTimeout(() => {
            try {
                enterButton.current.id = 'Error';
                setTimeout(() => {
                    try {
                        enterButton.current.textContent = 'Enter';
                        setTimeout(() => {
                            try {
                                enterButton.current.id = 'Active';
                            }catch(err) {}
                        }, 200);
                    }catch(err) {}
                }, 170);
            }catch(err) {}
        }, 5000);
    },

    userDontSpecified(input, label) {
        input('Error');
        setTimeout(() => {
            try {
                label.current.id = 'Active';
                label.current.textContent = ' - User was not specified';
                setTimeout(() => {
                    try {
                        input('');
                        label.current.id = 'Desactive';
                        setTimeout(() => {
                            try {
                                label.current.textContent = '';
                            }catch(err) {}
                        }, 200);
                    }catch(err) {}
               }, 5000);
            }catch(err) {}
        }, 100)
    },

    passwordDontSpecified(input, label) {
        input('Error');
        setTimeout(() => {
            try {
                label.current.id = 'Active';
                label.current.textContent = ' - Password was not specified';
                setTimeout(() => {
                    try {
                        input('');
                        label.current.id = 'Desactive';
                        setTimeout(() => {
                            try {
                                label.current.textContent = '';
                            }catch(err) {}
                        }, 200);
                    }catch(err) {}
               }, 5000);
            }catch(err) {}
        }, 100)
    },

    userIsWrong(input, label) {
        input('Error');
        setTimeout(() => {
            try {
                label.current.id = 'Active';
                label.current.textContent = ' - Unregistered user';
                setTimeout(() => {
                    try {
                        input('');
                        label.current.id = 'Desactive';
                        setTimeout(() => {
                            try {
                                label.current.textContent = '';
                            }catch(err) {}
                        }, 200);
                    }catch(err) {}
               }, 5000);
            }catch(err) {}
        }, 100)
    },

    passwordIsWrong(input, label) {
        input('Error');
        setTimeout(() => {
            try {
                label.current.id = 'Active';
                label.current.textContent = ' - Password is wrong';
                setTimeout(() => {
                    try {
                        input('');
                        label.current.id = 'Desactive';
                        setTimeout(() => {
                            try {
                                label.current.textContent = '';
                            }catch(err) {}
                        }, 200);
                    }catch(err) {}
               }, 5000);
            }catch(err) {}
        }, 100)
    },

}