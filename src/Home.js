import Feed from './Feed';
import { useContext } from 'react';
import dataContext from './dataContext';

const Home = () => {

    const { searchResults, fetchError, isLoading } = useContext(dataContext);
    return (
        <main className="Home">
            {isLoading && <p className = "statusMsg">Loading Posts....</p>}
            {!isLoading && fetchError && <p className = "statusMsg" style ={{color: "red"}}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? 
                <Feed posts={searchResults} />
            : 
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}

export default Home





        