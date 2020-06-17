import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { tutoVisController } from './tuto_vis_controller';
import optionsTemplate from './tuto_vis_editor.html';
import './tuto_vis.less';

function tutoVis(Private) {
  const VisFactory = Private(VisFactoryProvider);
  return VisFactory.createBaseVisualization({
    name: 'tuto_vis',
    type: 'metric',
    title: 'Tutoriel Visualisation',
    icon: 'clock',
    description: 'un plugin de visualisation',
    visualization: tutoVisController,
    visConfig: {
      defaults: {
        metricTitle: null,
        fontSize: 40,
        titleIndicator: 'SM title',
        volgablob: 'VolgaBlob',
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Y-axis',
          defaults: [{ type: 'max', schema: 'metric' }],
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'X-axis',
          aggFilter: ['range', 'date_range', 'terms'],
        },
      ]),
    },
  });
}

VisTypesRegistryProvider.register(tutoVis);
