
export default setAvatarImage = (avatar, size = 'xl') => {
    return {
        ...avatar,
        image: avatar.template.replace(/\{id\}_\{size\}/g, `${avatar.id}_${size}`),
    }
};
