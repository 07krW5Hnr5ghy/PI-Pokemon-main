let {usePage,DOTS} = require('./usePage');

const Page = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;
    /* pages bar logic */
    const pageRange = usePage({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    /* If there are less than 2 pages in pagination
        dont show the pagination bar */
    if(currentPage === 0 || pageRange.length < 2){
        return null;
    }

    /* forward one page */
    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    /* back one page */
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = pageRange[pageRange.length - 1];
    
    return(
        <ul>
            {/* left navigation arrow */}
            <li key={"left"} onClick={onPrevious}>
                <div className="arrow left">
                    {"<-"}
                </div> 
            </li>
            {pageRange.map(pageNumber => {
                // if the pageItem is a DOT, render the DOTS unicode character
                if(pageNumber === DOTS){
                    return <li key={pageNumber} className="dots">&#8230;</li>
                }

                // render page numbers
                return(
                    <li className="pageItem" key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            {/* right navigation arrow */}
            <li className="pageItem" key={"right"} onClick={onNext}>
                <div className="arrow right">
                    {"->"}
                </div>
            </li>
        </ul>
    );
};

export default Page;