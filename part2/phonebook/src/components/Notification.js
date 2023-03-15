const Notification = ({message}) => {
    
    if(message === null) return null

    const notificationStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        fontSize: 20,
        border: '4px solid green',
        borderRadius: 8,
        padding: 12,
    }

    return (
        <div className='notification' style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification