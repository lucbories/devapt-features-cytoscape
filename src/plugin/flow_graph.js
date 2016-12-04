
import T from 'typr'
import assert from 'assert'

import Devapt from 'devapt'

// const RenderingPlugin = Devapt.DefaultRenderingPlugin
// const DefaultButton = RenderingPlugin.get_class('Button')
const Component = Devapt.Component


const plugin_name = 'Cytoscape' 
const context = plugin_name + '/flow_graph'


const example = `
			$(function(){

				var cy = window.cy = cytoscape({
					container: document.getElementById('topology'),

          boxSelectionEnabled: false,
          autounselectify: true,

					layout: {
						name: 'grid'
					},

					style: [
						{
							selector: 'node',
							style: {
								'content': 'data(id)',
								'text-opacity': 0.5,
								'text-valign': 'center',
								'text-halign': 'right',
								'background-color': '#11479e'
							}
						},

						{
							selector: 'edge',
							style: {
								'width': 4,
								'target-arrow-shape': 'triangle',
								'line-color': '#9dbaea',
								'target-arrow-color': '#9dbaea'
							}
						}
					],

					elements: {
						nodes: [
							{ data: { id: 'n0' } },
							{ data: { id: 'n1' } },
							{ data: { id: 'n2' } },
							{ data: { id: 'n3' } },
							{ data: { id: 'n4' } },
							{ data: { id: 'n5' } },
							{ data: { id: 'n6' } },
							{ data: { id: 'n7' } },
							{ data: { id: 'n8' } },
							{ data: { id: 'n9' } },
							{ data: { id: 'n10' } },
							{ data: { id: 'n11' } },
							{ data: { id: 'n12' } },
							{ data: { id: 'n13' } },
							{ data: { id: 'n14' } },
							{ data: { id: 'n15' } },
							{ data: { id: 'n16' } }
						],
						edges: [
							{ data: { source: 'n0', target: 'n1' } },
							{ data: { source: 'n1', target: 'n2' } },
							{ data: { source: 'n1', target: 'n3' } },
							{ data: { source: 'n4', target: 'n5' } },
							{ data: { source: 'n4', target: 'n6' } },
							{ data: { source: 'n6', target: 'n7' } },
							{ data: { source: 'n6', target: 'n8' } },
							{ data: { source: 'n8', target: 'n9' } },
							{ data: { source: 'n8', target: 'n10' } },
							{ data: { source: 'n11', target: 'n12' } },
							{ data: { source: 'n12', target: 'n13' } },
							{ data: { source: 'n13', target: 'n14' } },
							{ data: { source: 'n13', target: 'n15' } },
						]
					},
				});

			});
`


export default class FlowGraph extends Component
{
	constructor(arg_name, arg_settings)
	{
		// UPDATE SETTINGS
		arg_settings = Component.normalize_settings(arg_settings)
		arg_settings.scripts_urls = arg_settings.scripts_urls.concat(
			[
				'plugins/Cytoscape/cytoscape.js',
				'plugins/Cytoscape/dagre.js',
				'plugins/Cytoscape/cytoscape-dagre.js'
				// 'plugins/Cytoscape/cytoscape.min.js'
			]
		)
		
		const js_init = FlowGraph.get_init_script(arg_name)
		arg_settings.scripts = arg_settings.scripts ? arg_settings.scripts : []
		arg_settings.scripts.push(js_init)
		
		arg_settings.styles = arg_settings.styles ? arg_settings.styles : []
		arg_settings.styles.push(`#topology {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 999;
			}`)
		
		super(arg_name, arg_settings)
	}
	
	
	
	static get_styles()
	{
		return `[
						{
							"selector":"core",
							"style":{
								"selection-box-color":"#AAD8FF",
								"selection-box-border-color":"#8BB0D0",
								"selection-box-opacity":"0.5"
							}
						},
						
						{
							selector: 'node',
							style: {
								'content': 'data(label)',
								'text-opacity': 0.5,
								'text-valign': 'center',
								'text-halign': 'center',
								// 'background-color': '#11479e',
								'font-size': '12px',
								'background-color':'#555',
								'text-outline-color':'#555',
								'text-outline-width':'1px',
								'color':'#fff',
								'overlay-padding':'6px',
								'z-index':'10'
							}
						},

						{
							selector: ':parent',
							style: {
								'background-opacity': 0.6
							}
						},
						
						{
							selector: 'edge',
							style: {
								'width': 4,
								'target-arrow-shape': 'triangle',
								'line-color': '#9dbaea',
								'target-arrow-color': '#9dbaea',
								'opacity': 0.8
							}
						}
					]`
	}
	
	
	
	static get_options(arg_name)
	{
		// const elements = FlowGraph.get_elements()
		const elements = '[]'
		const styles = FlowGraph.get_styles()
		const html_dom_id = arg_name
		
		return `
				{
					// very commonly used options:
					container: $('#${html_dom_id}'),
					elements: ${elements},
					style: ${styles},
					layout: { name: 'dagre' /* , ... */ },

					// initial viewport state:
					zoom: 1,
					pan: { x: 0, y: 0 },

					// interaction options:
					minZoom: 1e-50,
					maxZoom: 1e50,
					zoomingEnabled: true,
					userZoomingEnabled: true,
					
					panningEnabled: true,
					userPanningEnabled: true,
					
					boxSelectionEnabled: false,
					selectionType: 'single',
					
					touchTapThreshold: 8,
					desktopTapThreshold: 4,
					
					autolock: false,
					autoungrabify: false,
					autounselectify: false,

					// rendering options:
					headless: false,
					styleEnabled: true,
					
					hideEdgesOnViewport: false,
					hideLabelsOnViewport: false,
					textureOnViewport: false,
					
					motionBlur: false,
					motionBlurOpacity: 0.2,
					
					wheelSensitivity: 1,
					pixelRatio: 'auto'/*,
					renderer: {  }*/
				}
		`
	}
	
	
	
	static get_init_script(arg_name)
	{
		// return example
		const options = FlowGraph.get_options(arg_name)
		return `
		$(document).ready(
			function()
			{
				var view = window.devapt().ui('${arg_name}')
				view.init_cy = function() {
					view.cy = cytoscape(
						${options}
					)
				}
				
				view.add = function(arg_els)
				{
					view.cy.add(arg_els)
				}
				
				view.init_cy()
				
				// view.cy.resize(300, 300)
				// view.cy.forceRender()
			}
		)
		`
	}
	
	
	
	/**
	 * Render Cytoscape.
	 * 
	 * @returns {string} - html
	 */
	render_main()
	{
		// console.info(context + ':render_main')
		
		assert( T.isObject(this.state), context + ':render:bad state object')
		// assert( T.isArray(this.state.headers), context + ':render:bad state headers array')
		// assert( T.isArray(this.state.items), context + ':render:bad state items array')
		// assert( T.isString(this.state.label), context + ':render:bad state label string')
		
		// GET ATTRIBUTES
		const css_class1 = T.isString(this.state.css_class) ? this.state.css_class : undefined
		const css_class2 = this.get_css_classes_for_tag('cytoscape')
		const css_class = (css_class1 ? css_class1 + ' ' : '') + (css_class2 ? css_class2 : '')
		
		const css_attributes1 = T.isString(this.state.css_attributes) ? this.state.css_attributes : undefined
		const css_attributes2 = this.get_css_attributes_for_tag('cytoscape')
		const css_attributes = (css_attributes1 ? css_attributes1 + ' ' : '') + (css_class2 ? css_attributes2 : '')
		
		// BUILD HTML ELEMENT
		const html_id = 'id="' + this.get_dom_id() + '"'
		const html_css_class = (css_class && css_class != '') ? `class="${css_class}"` : ''
		const html_css_attributes = (css_attributes && css_attributes != '') ? `class="${css_attributes}"` : ''
		
		const html = `<div ${html_id} ${html_css_class} ${html_css_attributes}></div>\n`
		// console.info(context + ':render:html', html)
		
		return html
	}
}
