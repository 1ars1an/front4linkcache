import React from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getAllFolderLinks } from '../../services/requests';

export const Route = createFileRoute('/app/$fId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { fId } = useParams({
    from: '/app/$fId',
  });

  console.log(fId);

  const [page, setPage] = React.useState<number>(1);
  const { data, isPending } = useQuery({
    queryKey: ['allLinks', `${fId}`, `${page}`],
    queryFn: () => getAllFolderLinks(fId, page),
  });

  console.log(data);

  return isPending ? <div>Loading</div> : <div>RanSuves</div>;
}
