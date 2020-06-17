export default function(kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/tuto_vis/tuto_vis'],
    },
  });
}
