
import { FaFolderOpen } from 'react-icons/fa';

const NoPosts = () => {
    return (
        <main className='content-view noPosts'>
            <div className='flex-row' >
                <FaFolderOpen style={{ fontSize: '3rem' }} />
                <h2 style={{ fontSize: '2rem' }}>It's Empty!</h2>
            </div>
            <p style={{ fontSize: '1rem' }}>There are currently no posts to display</p>
        </main>
    )
}

export default NoPosts