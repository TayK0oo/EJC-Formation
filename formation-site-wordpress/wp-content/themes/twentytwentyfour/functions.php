<?php
/**
 * Twenty Twenty-Four functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Twenty Twenty-Four
 * @since Twenty Twenty-Four 1.0
 */

/**
 * Register block styles.
 */

if ( ! function_exists( 'twentytwentyfour_block_styles' ) ) :
	/**
	 * Register custom block styles
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_styles() {

		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __( 'Arrow icon', 'twentytwentyfour' ),
				/*
				 * Styles for the custom Arrow icon style of the Details block
				 */
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}

				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}

				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			)
		);
		register_block_style(
			'core/post-terms',
			array(
				'name'         => 'pill',
				'label'        => __( 'Pill', 'twentytwentyfour' ),
				/*
				 * Styles variation for post terms
				 * https://github.com/WordPress/gutenberg/issues/24956
				 */
				'inline_style' => '
				.is-style-pill a,
				.is-style-pill span:not([class], [data-rich-text-placeholder]) {
					display: inline-block;
					background-color: var(--wp--preset--color--base-2);
					padding: 0.375rem 0.875rem;
					border-radius: var(--wp--preset--spacing--20);
				}

				.is-style-pill a:hover {
					background-color: var(--wp--preset--color--contrast-3);
				}',
			)
		);
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'twentytwentyfour' ),
				/*
				 * Styles for the custom checkmark list block style
				 * https://github.com/WordPress/gutenberg/issues/51480
				 */
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
		register_block_style(
			'core/navigation-link',
			array(
				'name'         => 'arrow-link',
				'label'        => __( 'With arrow', 'twentytwentyfour' ),
				/*
				 * Styles for the custom arrow nav link block style
				 */
				'inline_style' => '
				.is-style-arrow-link .wp-block-navigation-item__label:after {
					content: "\2197";
					padding-inline-start: 0.25rem;
					vertical-align: middle;
					text-decoration: none;
					display: inline-block;
				}',
			)
		);
		register_block_style(
			'core/heading',
			array(
				'name'         => 'asterisk',
				'label'        => __( 'With asterisk', 'twentytwentyfour' ),
				'inline_style' => "
				.is-style-asterisk:before {
					content: '';
					width: 1.5rem;
					height: 3rem;
					background: var(--wp--preset--color--contrast-2, currentColor);
					clip-path: path('M11.93.684v8.039l5.633-5.633 1.216 1.23-5.66 5.66h8.04v1.737H13.2l5.701 5.701-1.23 1.23-5.742-5.742V21h-1.737v-8.094l-5.77 5.77-1.23-1.217 5.743-5.742H.842V9.98h8.162l-5.701-5.7 1.23-1.231 5.66 5.66V.684h1.737Z');
					display: block;
				}

				/* Hide the asterisk if the heading has no content, to avoid using empty headings to display the asterisk only, which is an A11Y issue */
				.is-style-asterisk:empty:before {
					content: none;
				}

				.is-style-asterisk:-moz-only-whitespace:before {
					content: none;
				}

				.is-style-asterisk.has-text-align-center:before {
					margin: 0 auto;
				}

				.is-style-asterisk.has-text-align-right:before {
					margin-left: auto;
				}

				.rtl .is-style-asterisk.has-text-align-left:before {
					margin-right: auto;
				}",
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_block_styles' );

/**
 * Enqueue block stylesheets.
 */

if ( ! function_exists( 'twentytwentyfour_block_stylesheets' ) ) :
	/**
	 * Enqueue custom block stylesheets
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_block_stylesheets() {
		/**
		 * The wp_enqueue_block_style() function allows us to enqueue a stylesheet
		 * for a specific block. These will only get loaded when the block is rendered
		 * (both in the editor and on the front end), improving performance
		 * and reducing the amount of data requested by visitors.
		 *
		 * See https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/ for more info.
		 */
		wp_enqueue_block_style(
			'core/button',
			array(
				'handle' => 'twentytwentyfour-button-style-outline',
				'src'    => get_parent_theme_file_uri( 'assets/css/button-outline.css' ),
				'ver'    => wp_get_theme( get_template() )->get( 'Version' ),
				'path'   => get_parent_theme_file_path( 'assets/css/button-outline.css' ),
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_block_stylesheets' );

/**
 * Register pattern categories.
 */

if ( ! function_exists( 'twentytwentyfour_pattern_categories' ) ) :
	/**
	 * Register pattern categories
	 *
	 * @since Twenty Twenty-Four 1.0
	 * @return void
	 */
	function twentytwentyfour_pattern_categories() {

		register_block_pattern_category(
			'twentytwentyfour_page',
			array(
				'label'       => _x( 'Pages', 'Block pattern category', 'twentytwentyfour' ),
				'description' => __( 'A collection of full page layouts.', 'twentytwentyfour' ),
			)
		);
	}
endif;

add_action( 'init', 'twentytwentyfour_pattern_categories' );

add_action('init', 'add_cors_https_header');
function add_cors_https_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
}

add_action('init', 'add_cors_http_header');
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
}






/* Ajout champs personnalisé woocommerce */



// Crée une nouvelle taxonomie pour les formateurs
function create_formateur_taxonomy() {
	$labels = array(
		'name' => 'Formateurs',
		'singular_name' => 'Formateur',
		'menu_name' => 'Formateurs',
		'all_items' => 'Tous les formateurs',
		'edit_item' => 'Modifier le formateur',
		'view_item' => 'Voir le formateur',
		'update_item' => 'Mettre à jour le formateur',
		'add_new_item' => 'Ajouter un nouveau formateur',
		'new_item_name' => 'Nom du nouveau formateur',
		'search_items' => 'Rechercher des formateurs',
	);

	$args = array(
		'hierarchical' => false,
		'labels' => $labels,
		'show_ui' => true,
		'show_admin_column' => true,
		'query_var' => true,
		'rewrite' => array('slug' => 'formateur'),
	);

	register_taxonomy('formateur', array('product'), $args);
}
add_action('init', 'create_formateur_taxonomy', 0);

// Ajoute des champs personnalisés pour les produits WooCommerce
function add_formation_custom_fields() {
	global $woocommerce, $post;

	echo '<div class="options_group">';

	// ID de la formation
	woocommerce_wp_text_input(
		array(
			'id' => '_formation_id',
			'label' => __('ID de la formation', 'woocommerce'),
			'placeholder' => 'Ex: ENT002',
			'desc_tip' => 'true',
			'description' => __('Entrez l\'ID unique de la formation.', 'woocommerce')
		)
	);

	// Catégorie de formation (utilisant les catégories WooCommerce)
	$product_categories = get_terms(array(
		'taxonomy' => 'product_cat',
		'hide_empty' => false,
	));
	$category_options = array('' => 'Sélectionnez une catégorie');
	foreach ($product_categories as $category) {
		$category_options[$category->term_id] = $category->name;
	}
	woocommerce_wp_select(
		array(
			'id' => 'product_cat',
			'label' => __('Catégorie de formation', 'woocommerce'),
			'options' => $category_options,
			'desc_tip' => 'true',
			'description' => __('Sélectionnez la catégorie de la formation.', 'woocommerce')
		)
	);

	// Durée
	woocommerce_wp_text_input(
		array(
			'id' => '_formation_duree',
			'label' => __('Durée', 'woocommerce'),
			'placeholder' => 'Ex: 30h',
			'desc_tip' => 'true',
			'description' => __('Entrez la durée de la formation.', 'woocommerce')
		)
	);

	// Compétences acquises
	woocommerce_wp_textarea_input(
		array(
			'id' => '_formation_competences',
			'label' => __('Compétences acquises', 'woocommerce'),
			'placeholder' => 'Listez les compétences, une par ligne',
			'desc_tip' => 'true',
			'description' => __('Entrez les compétences acquises, une par ligne.', 'woocommerce')
		)
	);

	// Public cible
	woocommerce_wp_textarea_input(
		array(
			'id' => '_formation_public_cible',
			'label' => __('Public cible', 'woocommerce'),
			'placeholder' => 'Listez le public cible, un par ligne',
			'desc_tip' => 'true',
			'description' => __('Entrez le public cible, un par ligne.', 'woocommerce')
		)
	);

	// Modalités
	woocommerce_wp_text_input(
		array(
			'id' => '_formation_modalites',
			'label' => __('Modalités', 'woocommerce'),
			'placeholder' => 'Ex: En ligne',
			'desc_tip' => 'true',
			'description' => __('Entrez les modalités de la formation.', 'woocommerce')
		)
	);

	// Prérequis
	woocommerce_wp_text_input(
		array(
			'id' => '_formation_prerequis',
			'label' => __('Prérequis', 'woocommerce'),
			'placeholder' => 'Ex: Avoir un projet d\'entreprise',
			'desc_tip' => 'true',
			'description' => __('Entrez les prérequis pour la formation.', 'woocommerce')
		)
	);

	// Lieu
	woocommerce_wp_text_input(
		array(
			'id' => '_formation_lieu',
			'label' => __('Lieu', 'woocommerce'),
			'placeholder' => 'Ex: Plateforme d\'apprentissage en ligne',
			'desc_tip' => 'true',
			'description' => __('Entrez le lieu de la formation.', 'woocommerce')
		)
	);

	// Formateur (liste déroulante)
	$formateurs = get_terms(array(
		'taxonomy' => 'formateur',
		'hide_empty' => false,
	));
	$formateur_options = array('' => 'Sélectionnez un formateur');
	foreach ($formateurs as $formateur) {
		$formateur_options[$formateur->term_id] = $formateur->name;
	}
	woocommerce_wp_select(
		array(
			'id' => 'formateur',
			'label' => __('Formateur', 'woocommerce'),
			'options' => $formateur_options,
			'desc_tip' => 'true',
			'description' => __('Sélectionnez le formateur.', 'woocommerce')
		)
	);

	// Champ de tags
	woocommerce_wp_text_input(
		array(
			'id' => 'product_tags',
			'label' => __('Tags', 'woocommerce'),
			'placeholder' => 'Ecrivez deux caractères min pour voir les suggestions',
			'description' => __('Entrez les tags séparés par des virgules.', 'woocommerce'),
			'desc_tip' => true,
			'value' => implode(', ', wp_get_post_terms($post->ID, 'product_tag', array('fields' => 'names')))
		)
	);
}
add_action('woocommerce_product_options_general_product_data', 'add_formation_custom_fields');

// Script pour l'autocomplétion des tags de formation
function formation_tags_autocomplete_script() {
    global $post_type;
    if ($post_type != 'product') return;
    ?>
    <script type="text/javascript">
    jQuery(document).ready(function($) {
        function split(val) {
            return val.split(/,\s*/);
        }
        function extractLast(term) {
            return split(term).pop();
        }

        $("#product_tags").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: ajaxurl,
                    dataType: "json",
                    data: {
                        action: "get_formation_terms",
                        term: extractLast(request.term),
                        taxonomy: "product_tag"
                    },
                    success: function(data) {
                        response(data);
                    }
                });
            },
            search: function() {
                var term = extractLast(this.value);
                if (term.length < 2) {
                    return false;
                }
            },
            focus: function() {
                return false;
            },
            select: function(event, ui) {
                var terms = split(this.value);
                terms.pop();
                terms.push(ui.item.label);
                terms.push("");
                this.value = terms.join(", ");
                return false;
            }
        });
    });
    </script>
    <?php
}
add_action('admin_footer', 'formation_tags_autocomplete_script');



// Callback pour récupérer les tags de produit
function get_product_tags_callback() {
	$term = $_GET['term'];
	$tags = get_terms(array(
		'taxonomy' => 'product_tag',
		'hide_empty' => false,
		'search' => $term
	));

	$tag_list = array();
	foreach ($tags as $tag) {
		$tag_list[] = $tag->name;
	}

	echo json_encode($tag_list);
	wp_die();
}
add_action('wp_ajax_get_product_tags', 'get_product_tags_callback');

// Enqueue jQuery UI pour l'autocomplétion
function enqueue_jquery_ui() {
	global $post_type;
	if ($post_type == 'product') {
		wp_enqueue_script('jquery-ui-autocomplete');
		wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
	}
}
add_action('admin_enqueue_scripts', 'enqueue_jquery_ui');

// Callback pour récupérer les termes de formation
function get_formation_terms_callback() {
	$term = $_GET['term'];
	$taxonomy = $_GET['taxonomy'];
	$terms = get_terms(array(
		'taxonomy' => $taxonomy,
		'hide_empty' => false,
		'search' => $term
	));

	$term_list = array();
	foreach ($terms as $term) {
		$term_list[] = array(
			'label' => $term->name,
			'value' => $term->term_id
		);
	}

	echo json_encode($term_list);
	wp_die();
}
add_action('wp_ajax_get_formation_terms', 'get_formation_terms_callback');

// Sauvegarde des champs personnalisés pour les produits WooCommerce
function save_formation_custom_fields($post_id) {
	$fields = array(
		'_formation_id',
		'_formation_duree',
		'_formation_competences',
		'_formation_public_cible',
		'_formation_modalites',
		'_formation_prerequis',
		'_formation_lieu'
	);

	foreach ($fields as $field) {
		$value = isset($_POST[$field]) ? $_POST[$field] : '';
		update_post_meta($post_id, $field, sanitize_text_field($value));
	}

	// Sauvegarde de la catégorie de formation (utilisant product_cat)
	if (isset($_POST['product_cat'])) {
		$category_id = sanitize_text_field($_POST['product_cat']);
		if (!empty($category_id)) {
			wp_set_object_terms($post_id, intval($category_id), 'product_cat');
		}
	}

	// Sauvegarde du formateur
	if (isset($_POST['formateur'])) {
		$formateur_id = sanitize_text_field($_POST['formateur']);
		if (!empty($formateur_id)) {
			wp_set_object_terms($post_id, intval($formateur_id), 'formateur');
		}
	}

	// Sauvegarde des tags
	if (isset($_POST['product_tags'])) {
		$tags = explode(',', sanitize_text_field($_POST['product_tags']));
		$tags = array_map('trim', $tags);
		wp_set_object_terms($post_id, $tags, 'product_tag');
	}
}
add_action('woocommerce_process_product_meta', 'save_formation_custom_fields');

function add_new_term_script() {
    global $post_type;
    if ($post_type != 'product') return;
    ?>
    <script type="text/javascript">
    jQuery(document).ready(function($) {
        $('#product_cat, #formateur, #product_tags').each(function() {
            var $input = $(this);
            var taxonomyName = $input.attr('id') === 'formateur' ? 'formateur' : 
                               ($input.attr('id') === 'product_tags' ? 'product_tag' : 'product_cat');
            var $addNew = $('<a href="#" class="add-new-term">Ajouter nouveau</a>');
            
            $input.after($addNew);
            
            $addNew.on('click', function(e) {
                e.preventDefault();
                var newTerm = prompt("Entrez le nom du nouveau terme :");
                if (newTerm) {
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'add_new_term',
                            taxonomy: taxonomyName,
                            term: newTerm
                        },
                        success: function(response) {
                            var data = JSON.parse(response);
                            if (data.success) {
                                if (taxonomyName === 'product_tag') {
                                    var currentTags = $input.val();
                                    $input.val(currentTags ? currentTags + ', ' + newTerm : newTerm);
                                } else {
                                    $input.append($('<option>', {
                                        value: data.term_id,
                                        text: newTerm
                                    }));
                                    $input.val(data.term_id);
                                }
                            } else {
                                alert('Erreur lors de l\'ajout du terme : ' + data.message);
                            }
                        }
                    });
                }
            });
        });
    });
    </script>
    <?php
}
add_action('admin_footer', 'add_new_term_script');

// Callback pour ajouter un nouveau terme via AJAX
function add_new_term_callback() {
	$taxonomy = $_POST['taxonomy'];
	$term = $_POST['term'];
	
	$result = wp_insert_term($term, $taxonomy);
	
	if (is_wp_error($result)) {
		echo json_encode(array('success' => false, 'message' => $result->get_error_message()));
	} else {
		echo json_encode(array('success' => true, 'term_id' => $result['term_id']));
	}
	
	wp_die();
}
add_action('wp_ajax_add_new_term', 'add_new_term_callback');
