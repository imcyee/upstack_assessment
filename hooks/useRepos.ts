import flatten from 'lodash/flatten';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { octokit, org } from '../utils/octokit';
import type { RootState } from '../app/store';
import { setMaxPage } from '../reducers/pageSlice';

const limit = 10


export const useRepos = () => {

  const page = useSelector((state: RootState) => state.page.value)
  const isMaxPage = useSelector((state: RootState) => state.page.maxPage)

  const fetchRepos = ({ pageParam = 1 }) => octokit.request(`GET /orgs/${org}/repos`, {
    org,
    page: pageParam,
    per_page: limit,
    headers: { 'X-GitHub-Api-Version': '2022-11-28' }
  }).then((payload) => {
    if (payload?.data?.length < limit)
      setMaxPage(page) // disable 'next' end of result
    return payload?.data
  })

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  })

  const flattenData = useMemo(() => {
    if (data && data.pages)
      return flatten(data.pages)
    else return []
  }, [data?.pages?.length])


  return { flattenData, isLoading, isFetching, error, fetchNextPage, isMaxPage }
}