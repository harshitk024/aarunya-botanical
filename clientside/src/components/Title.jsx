const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl font-semibold text-slate-800'>{title}</h2>
        </div>
    )
}

export default Title