import SortingChartModel from './model';
import SortingChartView from './view';
import SortingChartController from './controller';

export default new SortingChartController(new SortingChartModel(), new SortingChartView());
