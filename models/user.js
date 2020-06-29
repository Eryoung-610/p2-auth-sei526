// User model declaration
// Define use case
// Import any required libraries
'use strict';
const bcrypt = require('bcrypt')
// Declare user model format
module.exports = function (sequelize, DataTypes) {
    // Define user object
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid Email Address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number'
                }
            }
        }
    }, {
        hooks: {
            // before record creation
            beforeCreate: function (createdUser, options) {
                if (createdUser && createdUser.password) {
                    // Take inputed password
                    // Hash it
                    // Return new password as new password for new record

                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash;
                }
            }
        }
    });
    user.associate = function (models) {
        // Associations here
    }

    // Valid password declaration to validate user password at login
    user.prototype.validPassword = function(passwordTyped) {
       return bcrypt.compareSync(passwordTyped,this.password);
    }

    // remove password before serialization of user object
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }

    return user;
};
    // email
    // name
    // password
    // Hook
    // Before new record
    // Hash password
    // User associations
}
// Take inputed password and compare to hashed password in user table
// Hash new password to adsd to user table
