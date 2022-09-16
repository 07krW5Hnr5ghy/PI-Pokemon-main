import { useMemo } from "react";

export const DOTS = "...";

const range = (start,end) => {
    let length = end - start + 1;
    /* Create an array of certain length 
    and set the elements within it from
    start value to end value 
    */
   return Array.from({length},(_,index)=>index + start);
};

export const usePage = ({
    totalCount,
    pageSize,
    /* min amount of pages of each side
    of current Page */
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(()=>{
        console.log("use page");
        /* set the total the of pages
        total pokemons divided by pagesize */
        const totalPageCount = Math.ceil(totalCount/pageSize);
        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;
        /* Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount] */
        if(totalPageNumbers >= totalPageCount){
            return range(1,totalPageCount);
        }
        /* Calculate left and right pages index of the current 
        Page and make sure they are within range 1 and totalPageCount */
        const leftPageIndex = Math.max(currentPage - siblingCount,1);
        const rightPageIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        /* Determine if show left dots and right dots */
        /* if the left section of bar has more than 2 pages 
        show the left dots */
        const shouldShowLeftDots = leftPageIndex > 2;
        /* if the right section of bar has more than 2 pages
        show the right dots  */
        const shouldShowRightDots = rightPageIndex < totalPageCount - 2;
        /* firts and last pages index */
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /* Case 2: No left dots to show, but rights dots to be shown */
        if(!shouldShowLeftDots && shouldShowRightDots){
            /* 2 * siblings value of curent page + first page + last page
            of left section */
            let leftItemCount = 3 + 2 * siblingCount;
            /* set range of items left section */
            let leftRange = range(1,leftItemCount);
            /* return layout of pages bar */
            return [...leftRange,DOTS,totalPageCount];
        }

        /* Case 3: No right dots to show, but left dots to be shown */
        if(shouldShowLeftDots && !shouldShowRightDots){
            /* 2 * siblings value of curent page + first page + last page
            of right section */
            let rightItemCount = 3 + 2 * siblingCount;
            /* set range of items right section */
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            /* return layout of pages bar */
            return [firstPageIndex,DOTS,...rightRange];
        }

        /* Case 4: Both left and right dots to be shown */
        if(shouldShowLeftDots && shouldShowRightDots){
            /* set middle range */
            let middleRange = range(leftPageIndex, rightPageIndex);
            /* return layout of pages bar */
            return [firstPageIndex,DOTS,...middleRange,DOTS,lastPageIndex];
        }

    },[totalCount,pageSize,siblingCount,currentPage]);

    return paginationRange;
};
