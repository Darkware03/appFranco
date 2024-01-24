<template>
  <q-page>
    <q-list class="text-center">
      <q-card v-if="routes">
        <q-item v-for="route in routes" :key="route.path" class="flex flex-center">
          <q-card-section class="q-card--bordered">
            <q-item-section @click="$router.push(route.path)">
              <q-item-label>{{ route.name }}</q-item-label>
            </q-item-section>
          </q-card-section>
        </q-item>
      </q-card>
    </q-list>
  </q-page>
</template>

<script>
import routes from '../router/routes';

export default {
  name: 'RoutesList',
  data() {
    return {
      routes: routes[0].children.map(route => ({
        name: route.path,
        path: route.path
      }))
    };
  }
};
</script>
