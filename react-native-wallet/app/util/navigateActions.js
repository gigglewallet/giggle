import { NavigationActions, StackActions } from 'react-navigation'
import * as RouteNames from '../constants/routeName'

export const REDIRECT_TO_HOME = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: RouteNames.HOME })],
});
