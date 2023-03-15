const Notification = ({notificationData}) => {
    
    if(notificationData === null) return null
    const {message, isError} = notificationData

    const styleColor = isError ? 'red' : 'green'

    const notificationStyle = {
        color: styleColor,
        backgroundColor: 'lightgrey',
        fontSize: 20,
        border: `4px solid ${styleColor}`,
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