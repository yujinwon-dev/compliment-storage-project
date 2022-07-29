import { useAppSelector } from '../store/hooks';

export function useCompliment(targetId: number) {
  const complimentList = useAppSelector(state => state.complimentList);
  return complimentList[targetId];
}
