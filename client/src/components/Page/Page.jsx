import "./Page.css";
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
    
    const pageRange = usePage({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    /* If there are less than 2 times in pagination
        range we shall not render the component */
    if(currentPage === 0 || pageRange.length < 2){
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = pageRange[pageRange.length - 1];
    return(
        <ul>
            {/* left navigation arrow */}
            <li onClick={onPrevious}>
                <div className="arrow left">
                    {"<-"}
                </div> 
            </li>
            {pageRange.map(pageNumber => {
                // if the pageItem is a DOT, render the DOTS unicode character
                if(pageNumber === DOTS){
                    return <li className="dots">&#8230;</li>
                }

                // Render our Page Pills
                return(
                    <li className="pageItem" key={pageNumber} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            {/* right navigation arrow */}
            <li className="pageItem" onClick={onNext}>
                <div className="arrow right">
                    {"->"}
                </div>
            </li>
        </ul>
    );
};

export default Page;