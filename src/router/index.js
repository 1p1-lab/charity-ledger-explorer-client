import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Foundations from '@/components/Foundations'
import Foundation from '@/components/Foundation'
import Target from '@/components/Target'
import Project from '@/components/Project'
import Program from '@/components/Program'
import ImportForm from '@/components/ImportForm'
import Association from '@/components/Association'
import Terms from '@/components/Terms'
import Error404 from '@/components/errors/Error404'

Vue.use(Router)

export default new Router({
  mode:   'history',
  routes: [

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Index
    {
      path:      '/',
      name:      'home',
      component: Home
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Foundations
    {
      path:      '/foundations',
      name:      'foundations',
      component: Foundations
    },
    {
      path:      '/foundation/:id',
      name:      'foundation',
      component: Foundation
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Foundation Targets
    {
      path:      '/foundation/:idFoundation/target/:idTarget',
      name:      'target',
      component: Target
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Foundation Projects
    {
      path:      '/foundation/:idFoundation/project/:idProject',
      name:      'project',
      component: Project
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Foundation Programs
    {
      path:      '/foundation/:idFoundation/program/:idProgram',
      name:      'program',
      component: Program
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Charity Blockchain Association
    {
      path:      '/association',
      name:      'association',
      component: Association
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Terms
    {
      path:      '/terms',
      name:      'terms',
      component: Terms
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Import
    {
      path:      '/import',
      name:      'import',
      component: ImportForm
    },

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //Error 404. Page not found
    {
      path:      '/*',
      name:      'Error404',
      component: Error404
    },
  ],

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
