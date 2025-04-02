import bcrypt from 'bcrypt';
import jwt from '../jwt.js';
import User from '../models/User.js'

const userService = {
    async register(firstName, lastName, email, password, rePassword) {
        const user = await User.findOne({ email }).select('email');
    
        if (user) {
            throw new Error('This email is already registered');
        }
        if (password !== rePassword) {
            throw new Error('Passwords must match!');
        }
        const newUser = await User.create({ firstName, lastName, email, password, rePassword });
    
        return generateResponse(newUser);
    },
    async login(email, password) {

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('This email is not registered!');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password!')
        }
        return generateResponse(user);
    },


    async updateUser(userId, updateData) {
        try {
            console.log('Attempting to update user:', { userId, updateData });
    
            const user = await User.findById(userId);
    
            if (!user) {
                console.log('User not found with id:', userId);
                throw new Error('User not found');
            }
    
            const updatedFields = {};
    
            if (updateData.firstName) {
                updatedFields.firstName = updateData.firstName;
            }
    
            if (updateData.lastName) {
                updatedFields.lastName = updateData.lastName;
            }
    
            if (updateData.score) {
                updatedFields.score = user.score + (updateData.score || 0);
            }
    
            if (updateData.answers) {
                user.answers.push(...updateData.answers);
                updatedFields.answers = user.answers;
            }
    
            const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
    
            console.log('User successfully updated:', updatedUser);
            return updatedUser;
        } catch (err) {
            console.error('Failed to update user data:', err);
            throw new Error('Failed to update user data');
        }
    }
    ,
    
    async getProfile(userId) {
        return await User.findById(userId).select("-password").lean();
    },

    async edit(userId, userData) {
        const updatedUser = await User.findByIdAndUpdate(userId, userData,
            {
                runValidators: true,
                new: true
            }).select("-password");
        return generateResponse(updatedUser);
    },
    async delete(userId) {
        await User.findByIdAndDelete(userId);
        await Cart.findOneAndDelete({ owner: userId })
        return
    },
}

async function generateResponse(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        score: user.score,
    }

    const header = { expiresIn: '1d' };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, header)
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        score: user.score,
        accessToken: token
    }
}

export default userService;