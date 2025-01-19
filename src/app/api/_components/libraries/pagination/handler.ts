import { PaginatedData, PaginationOptions } from "@/app/app-types";
import { stringify } from "qs";

/**
 * This controller is used to generate pagination instructions and responses for page-based pagination.
 */
export class PaginationHandler {
  constructor(private options: PaginationOptions) {}

  getInstructions = (): { limit: number; offset: number } => {
    const { currentPage, limit } = this.options;
    return {
      limit: limit + 1,
      offset: (currentPage - 1) * limit
    };
  };

  private createResponse = <T extends Array<Record<string, unknown>>>({
    hasMore,
    totalCount
  }: {
    hasMore: boolean;
    totalCount: number;
  }): PaginatedData<T>["pagination"] => {
    const { currentPage, cursors, sortOrder, limit, searchParams } =
      this.options;
    const sortBy = cursors[0]?.columnName;
    const getQueryParams = (page: number | null) =>
      `?${stringify({
        ...searchParams,
        sortBy,
        sortOrder,
        limit,
        page: page ?? undefined
      })}`;

    const maxPage = totalCount ? Math.ceil(totalCount / limit) : null;
    const nextPageNumber = currentPage + 1;
    const previousPageNumber = currentPage - 1;

    if (!maxPage || (currentPage >= maxPage && hasMore)) {
      return {
        links: {
          nextPage: hasMore ? getQueryParams(nextPageNumber) : null,
          previousPage:
            previousPageNumber > 0 ? getQueryParams(previousPageNumber) : null,
          firstPage: getQueryParams(1),
          lastPage: maxPage ? getQueryParams(maxPage) : getQueryParams(1)
        },
        searchParams: {
          ...searchParams,
          page: currentPage,
          sortBy,
          sortOrder,
          limit
        },
        counts: {
          items: totalCount,
          pages: maxPage || 1
        }
      };
    }

    const moveBackwards = (toPage: number) =>
      currentPage > maxPage
        ? getQueryParams(maxPage)
        : toPage >= 1
          ? getQueryParams(toPage)
          : null;
    const moveForwards = (toPage: number) =>
      currentPage >= maxPage
        ? null
        : toPage <= maxPage
          ? getQueryParams(toPage)
          : getQueryParams(maxPage);

    const nextPage = moveForwards(nextPageNumber);
    const previousPage = moveBackwards(previousPageNumber);
    const firstPage = getQueryParams(1);
    const lastPage = maxPage ? getQueryParams(maxPage) : null;
    return {
      links: {
        nextPage,
        previousPage,
        firstPage,
        lastPage
      },
      searchParams: {
        ...searchParams,
        page: currentPage,
        sortBy,
        sortOrder,
        limit
      },
      counts: {
        items: totalCount,
        pages: maxPage
      }
    };
  };

  getResponse = <T extends Array<Record<string, unknown>>>({
    data,
    totalCount
  }: {
    data: T;
    totalCount: number;
  }): PaginatedData<T> => {
    const { limit } = this.options;
    const hasMore = data.length > limit;
    return {
      data: hasMore ? (data.slice(0, limit) as T) : data,
      pagination: this.createResponse({
        totalCount,
        hasMore
      })
    };
  };
}
