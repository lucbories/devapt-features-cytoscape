
// NPM IMPORTS
import assert from 'assert'
import path from 'path'

// DEVAPT CORE COMMON IMPORTS
import T               from 'devapt-core-common/dist/js/utils/types'
import RenderingPlugin from 'devapt-core-common/dist/js/plugins/rendering_plugin'

// PLUGIN IMPORTS
import FlowGraph from './plugin/flow_graph'


const plugin_name = 'Cytoscape' 
const context = plugin_name + '/cytoscape_rendering_plugin'



export default class CytoscapePlugin extends RenderingPlugin
{
	constructor(arg_runtime, arg_manager)
	{
		super(arg_runtime, arg_manager, plugin_name, '1.0.0')
		
		const base_dir = __dirname + '/../node_modules/cytoscape/dist'
		this.add_public_asset('js', '/' + plugin_name + '/cytoscape.js', path.join(base_dir, 'cytoscape.js') )
		this.add_public_asset('js', '/' + plugin_name + '/cytoscape.min.js', path.join(base_dir, 'cytoscape.min.js') )
		
		const dagre_dir = __dirname + '/../node_modules/dagre/dist'
		this.add_public_asset('js', '/' + plugin_name + '/dagre.js', path.join(dagre_dir, 'dagre.js') )
		this.add_public_asset('js', '/' + plugin_name + '/dagre-min.js', path.join(dagre_dir, 'dagre-min.js') )
		
		const cydagre_dir = __dirname + '/../node_modules/cytoscape-dagre'
		this.add_public_asset('js', '/' + plugin_name + '/cytoscape-dagre.js', path.join(cydagre_dir, 'cytoscape-dagre.js') )
	}
	
	
    
	/**
     * Get a feature class.
     * @param {string} arg_class_name - feature class name.
     * @returns {object} feature class.
     */
	get_feature_class(arg_class_name)
	{
		assert( T.isString(arg_class_name), context + ':get_class:bad class string')
		
		return CytoscapePlugin.get_class(arg_class_name)
	}
	
	
	create(arg_class_name, arg_name, arg_settings, arg_state)
	{
		assert( T.isString(arg_class_name), context + ':create:bad class string')
		
		switch(arg_class_name)
		{
			case 'FlowGraph': return new FlowGraph(arg_name, arg_settings, arg_state)
		}
		
		assert(false, context + ':create:bad class name')
		return undefined
	}
	
	
	/**
     * Get a feature class.
     * @param {string} arg_class_name - feature class name.
     * @returns {object} feature class.
	 */
	static get_class(arg_class_name)
	{
		assert( T.isString(arg_class_name), context + ':get_class:bad class string')
		
		switch(arg_class_name)
		{
			case 'FlowGraph':   return FlowGraph
		}
		
		assert(false, context + ':get_class:bad class name')
		return undefined
	}
	
	
	has(arg_class_name)
	{
		switch(arg_class_name)
		{
			case 'FlowGraph':
				return true
		}
		
		return false
	}
}
