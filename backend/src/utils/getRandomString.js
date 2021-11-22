const {randomBytes} = await import('crypto');

const getRandomString = () => {
    return randomBytes(128).toString('hex')
}

export default getRandomString