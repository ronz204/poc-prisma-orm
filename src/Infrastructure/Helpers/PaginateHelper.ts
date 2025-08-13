interface Props {
  page: number;
  limit: number;
};

export class PaginateHelper {
  public static paginate(props: Props) {
    return {
      limit: props.limit,
      offset: (props.page - 1) * props.limit
    };
  };
};
