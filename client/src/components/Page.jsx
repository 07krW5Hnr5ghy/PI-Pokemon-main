let {usePage,DOTS} = require('./usePage');

const Page = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
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
        <ul id="Page_container">
            {/* left navigation arrow */}
            <button key={"left"} onClick={onPrevious} disabled={currentPage === 1 ? "disabled" : ""}>
                {" < "}
            </button>
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
            <button key={"right"} onClick={onNext} disabled={currentPage === lastPage ? "disabled" : ""}>
                {" > "}
            </button>
        </ul>
    );
};

export default Page;